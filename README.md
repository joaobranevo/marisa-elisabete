# Marisa Elisabete Arquitetura — v4
**marisaelisabete.com.br**

## Estrutura de URLs
```
/                           → Home
/sobre/                     → Sobre Mim
/projetos/                  → Portfólio
/servicos/                  → Serviços
/servicos/arquitetura-residencial/
/servicos/projetos-comerciais/
/servicos/interiores/
/servicos/visualizacao-3d/
/servicos/administracao-de-obras/
/servicos/regularizacao/
/contato/
```

## Deploy GitHub + Vercel
```bash
git init && git add . && git commit -m "Marisa Elisabete v4"
git remote add origin https://github.com/SEU_USUARIO/marisa-elisabete.git
git push -u origin main
# Vercel: Import → Other → Deploy
# Settings → Domains → marisaelisabete.com.br
```

## Adicionar fotos dos projetos
1. Coloque as fotos em `assets/fotos/`
2. Edite `assets/data.js` — array `photos` de cada projeto
3. Nas páginas `/servicos/*/index.html`, atualize o array `GALPHOTOS`

## Google Analytics
GA4 já configurado: `G-1FXBHBPT48`
