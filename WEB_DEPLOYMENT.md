# Nasazení ZSV trenažéru

Nahrajte obsah ZIPu do kořenové složky statického webu. Doporučené varianty:

- Netlify: přetáhněte rozbalenou složku do Netlify Drop. Soubor `_headers` se použije automaticky.
- GitHub Pages: nahrajte soubory do repozitáře a zapněte Settings > Pages > Deploy from branch.
- běžný hosting: nahrajte soubory přes FTP/SFTP a nastavte HTTPS.

## Důležité

- Web musí běžet přes HTTPS, aby cookie dostalo atribut `Secure`.
- Cookie `zsv_progress_v2` je first-party, SameSite=Lax, Path=/ a platí 12 měsíců.
- Statistiky jsou komprimované do dvou bitových map a vejdou se do jednoho cookie i pro všech 1 494 úloh.
- Starší statistiky z `localStorage` se při prvním spuštění automaticky převedou do cookie.
- Při lokálním otevření přes `file://` nemusí prohlížeč cookie podporovat. Pro test použijte lokální HTTP server, například `python3 -m http.server 8080`.
- Pro rychlé načítání zapněte na hostingu Brotli nebo gzip pro `.js`, `.css`, `.html`, `.json` a `.webmanifest`.
