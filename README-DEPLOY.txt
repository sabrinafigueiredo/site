DEPLOY NA VERCEL

Estrutura pronta para site estático:
- index.html
- style.css
- script.js
- assets/images/

Na Vercel:
1. Framework Preset: Other
2. Root Directory: pasta onde está este index.html
3. Build Command: vazio
4. Output Directory: vazio

ATENÇÃO:
O HTML original referencia dois arquivos que não estavam incluídos no arquivo enviado:
- images/perda_auditiva_poster.jpg
- videos/perda_auditiva.mp4

Esses dois arquivos precisam ser adicionados nesses caminhos para o vídeo local funcionar. A ausência deles não impede a página principal de abrir, mas gera 404 apenas nesses recursos.
