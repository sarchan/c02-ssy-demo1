# LV-Änderungen, Kommandos, Anmerkungen

## Testen von Funktionen/Routen

Routen können entweder manuall mit telnet getestet werden (etwas mühsam :o),
mit `curl` oder mit einem Browser-Plugin, z.B.

* [Rest-Client für Firefox](https://addons.mozilla.org/en-US/firefox/addon/restclient)
* [Restlet-Client für Chrome](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm?hl=en-GB)

### Beispiele für CURL

```bash
# Erzeugt einen GET-Request
curl localhost:3000/users/3

# Erzeugt einen DELETE-Request
curl -XDELETE localhost:3000/users/3
```

## LV, 25.11.2017

Um neue Routen hinzuzufügen haben wir eine neue Datei routes/users.js
angelegt und in app.js hinzugefügt. In users.js selbst haben wir folgende
Routen bzw. Funktionen definiert:
  
```javascript
// users.js
getAllUsers(request, response)
getSingleUser(request, response)
deleteSingleUser(request, response)
```
