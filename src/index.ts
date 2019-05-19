import app from "./App";

//get router
//options for cors midddleware



//enable pre-flight

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})