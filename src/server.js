// bu dosyada amacımız sunucuyu başlatmak, uygulamayı çalıştırmak

require("dotenv").config();

const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server ${PORT} portunda çalışıyor`);
});