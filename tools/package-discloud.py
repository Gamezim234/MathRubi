"""Cria o ZIP do MathRubi para Discloud: python tools/package-discloud.py --subdomain mathrubi."""
from pathlib import Path
import argparse
import re
import zipfile

parser = argparse.ArgumentParser(description='Empacota o app público para Discloud.')
parser.add_argument('--subdomain', required=True, help='Nome já reservado na Discloud, sem o domínio.')
parser.add_argument('--output', default='output/discloud/mathrubi.zip')
args = parser.parse_args()
if not re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?', args.subdomain):
    parser.error('Subdomínio inválido: use letras minúsculas, números e hífens.')
root = Path(__file__).resolve().parent.parent
public = root / 'dist'
output = (root / args.output).resolve()
files = sorted(p for p in public.rglob('*') if p.is_file() and not p.is_symlink()
               and not any(part.startswith(('.', '__')) for part in p.relative_to(public).parts))
if not (public / 'index.html').is_file():
    raise SystemExit('dist/index.html ausente.')
config = '\n'.join(['NAME=MathRubi', 'TYPE=site', 'ID=' + args.subdomain,
                    'MAIN=tools/serve.js', 'START=env HOST=0.0.0.0 PORT=8080 node tools/serve.js',
                    'RAM=512', 'VERSION=latest', 'AUTORESTART=true', ''])
output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(output, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    archive.writestr('discloud.config', config)
    for file in files:
        archive.write(file, file.relative_to(root).as_posix())
    for name in ('tools/serve.js', 'tools/practice-api.js', 'tools/account-api.js'):
        archive.write(root / name, name)
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None
    names = set(archive.namelist())
    assert {'dist/index.html', 'discloud.config', 'tools/serve.js', 'tools/practice-api.js'} <= names
    assert not any(n.startswith(('arquivo/', '.git/')) or '__visual' in n for n in names)
    html = archive.read('dist/index.html').decode('utf-8-sig')
    for asset in re.findall(r'(?:src|href)="([^"#]+)"', html):
        if asset.startswith(('http:', 'https:', '/', 'data:', './')):
            continue
        target = asset.split('?')[0].split('#')[0]
        if target and 'dist/' + target not in names:
            raise SystemExit('Recurso ausente do ZIP: ' + target)
print(str(output))
print(str(len(files)) + ' arquivos públicos + discloud.config; ZIP íntegro e referências verificadas.')
print('Subdomínio configurado: ' + args.subdomain + ' (deve estar reservado na conta).')
