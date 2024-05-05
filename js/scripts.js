const indexdDb = window.indexedDB;

let db 

const conexion = indexdDb.open('listaTareas',1)

conexion.onsuccess = () => { 
    db = conexion.result
    console.log('Base de datos abierta',db)
}

conexion.onupgradeneeded = (e) => {
    db = e.target.result
    console.log('Base de datos creada', db)
    const coleccionObjetos = db.createObjectStore('tareas',{
       keyPath: 'clave' 
    })
}

conexion.onerror = (error) => {
console.log('Error',error)
}


const agregar = (info) => {
    const transaccion = db.transaction(['tareas'],'readwrite')
    const coleccionObjetos = transaccion.objectStore('tareas')
    const conexion = coleccionObjetos.add(data)
    consultar()
}
//solo nos devuelve un registro

const obtener = (clave) => {
    const transaccion = db.transaction(['tareas'],'readonly')
    const coleccionObjetos = transaccion.objectStore('tareas')
    const conexion = coleccionObjetos.get(data)

    conexion.onsuccess = (e) =>{
        console.log(conexion.result)

    }
 
}

const actualizar = (data) => {
    const transaccion = db.transaction(['tareas'],'readwrite')
    const coleccionObjetos = transaccion.objectStore('tareas')
    const conexion = coleccionObjetos.put(data)

    conexion.onsuccess = () =>{
        consultar()
    }  
}

const eliminar = (clave) => {
    const transaccion = db.transaction(['tareas'],'readwrite')
    const coleccionObjetos = transaccion.objectStore('tareas')
    const conexion = coleccionObjetos.delete(clave)

    conexion.onsuccess = () =>{
        consultar()
    }  
    
}

const consultar = () =>{
    const transaccion = db.transaction(['tareas'],'readonly')
    const coleccionObjetos = transaccion.objectStore('tareas')
    const conexion = coleccionObjetos.openCursor()


    conexion.onsuccess = (e) =>{
        const cursor = e.target.result
        if(cursor){
            console.log(cursor.value)
            cursor.continue()
        }else{
            console.log('No hay tareas en la lista')
        }

    }

}
