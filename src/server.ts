import app from "./app"
import { starDataBase } from "./dataBase"

app.listen(3000, async () => {
    await starDataBase()
    console.log("Server is running!")
})