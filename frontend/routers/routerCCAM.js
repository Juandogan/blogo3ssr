const { Router } = require('express');
const jwt = require('jsonwebtoken');
const articuloModel = require('../models/articuloModel');
const path = require ('path')
const router = Router()

const multipart = require ('connect-multiparty');
const express = require('express');
const multiPartMiddleware = multipart({
  uploadDir: '../subidas'

});

router.use('/upload', express.static(path.resolve('./subidas')))

// ++++++++++++++++++++++   GET TODO EL ARREGLO ++++++++++++++++++++++++++++++++++++
                 //verifyToken
router.get('/' ,  async (req, res)=>{ 
    const articulo = await articuloModel.find({},{_id:1, titulo:1, imagen1:1, posicion:1, categoria:1, vistas:1, fecha:1, fechaMod:1, 
        correos:1, subtitulo:1, comentarios:1, contadorComentarios:1, indice:1, autor:1, fotografia:1,popup:1        });
        res.json(articulo);
});

// router.post('/actualizar' , async (req, res)=>{ 
//   const articulo2 = await articuloModel.find({},{_id:1, titulo:1, imagen1:1, posicion:1, categoria:1, vistas:1, fecha:1, fechaMod:1, 
//     correos:1, subtitulo:1, comentarios:1, contadorComentarios:1, indice:1, autor:1, fotografia:1, nota:1  });
//     res.json(articulo2);


//         console.log("Actualizando")

//         // {posicion: 5, "titulo": { $regex: '^Biogra' }}   

//         const filtro = {imagen1:''} 


//         const actualizacion = { $set: { categoria: 'Historia · Montañismo en Argentina'  } };

//   const articulo = await articuloModel.updateMany(filtro, actualizacion);
//   console.log("actualizado!")
      
// });

 // ++++++++++++++++++++++   POST NUEVO ARTICULO  ++++++++++++++++++++++++++++++++++++

 router.post('/actualizarNOS', async (req, res) => {
  try {
    console.log("revisando");

    // Obtener hasta 10 documentos de la colección articuloModel que tengan imagen1 como null { $regex: '^http://66'}
    const articulos = await articuloModel.find({ _id : '' }, {
      _id: 1,
      nota:1,
      autor:1
    });

    for (const articulo of articulos) {
      const imageURL = extractCustomText2(articulo.nota);
      console.log("corte",imageURL)
      if (imageURL) {
        console.log("Actualizando artículo:", articulo._id);
       
        // Actualizar el campo imagen1 con la URL de la segunda imagen
        await articuloModel.updateOne({
          _id: articulo._id
        }, {
          $set: {
            autor: imageURL
          }
        });
      }
    }

    console.log("Actualización completa!");
    res.json({
      message: "Actualización completa"
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      error: "Error al actualizar"
    });
  }
});







 router.post('/actualizarCuentaRepetids', async (req, res) => {
  try {
    console.log("Actualizando");

    // Encontrar registros duplicados por el campo "titulo"
    const duplicates = await articuloModel.aggregate([
      {
        $group: {
          _id: { titulo: "$titulo" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]).exec();  // Utilizamos exec() para ejecutar la consulta de agregación

    console.log("Cantidad de registros con título repetido:", duplicates.length);

    console.log("Actualización completa!");
    res.json({
      message: "Actualización completa"
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      error: "Error al actualizar"
    });
  }
});



 router.post('/actualizarrepetidosenposicioncinco', async (req, res) => {
  try {
    console.log("Actualizando");

    // Encontrar registros duplicados por el campo "titulo"
    const duplicates = await articuloModel.aggregate([
      {
        $group: {
          _id: { titulo: "$titulo" },
          count: { $sum: 1 },
          docs: { $push: "$_id" } // Almacenar los IDs de los documentos duplicados
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]).exec();  // Utilizamos exec() para ejecutar la consulta de agregación

    console.log("Cantidad de registros duplicados:", duplicates.length);

    // Iterar sobre los duplicados y eliminar los que tienen propiedad "posicion" igual a 5
    for (const duplicate of duplicates) {
      const duplicateIdsToDelete = duplicate.docs.slice(1); // Mantener solo los IDs excepto el primero
      await articuloModel.deleteMany({ _id: { $in: duplicateIdsToDelete }, posicion: 5 });
    }

    console.log("Registros duplicados con posición 5 eliminados");

    console.log("Actualización completa!");
    res.json({
      message: "Actualización completa"
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      error: "Error al actualizar"
    });
  }
});


router.post('/actualizarImagen1', async (req, res) => {
  try {
    console.log("Iniciando actualización de imagen1...");

    // Encuentra todos los documentos que contienen "http://168.197.50.191/" en el campo img1
    const filter = {
      resultadoImagen12: { $regex: /http:\/\/168\.197\.50\.191\// }
    };

    // Recupera los documentos que coinciden con el filtro
    const articulos = await articuloModel.find(filter).limit(300);

    // Realiza la modificación en cada documento y guárdalo
    for (const articulo of articulos) {
      console.log(articulo.resultadoImagen12)
      articulo.resultadoImagen12 = await articulo.resultadoImagen12.replace(/http:\/\/168\.197\.50\.191\//g, 'https://www.culturademontania.org.ar/ccam/');
       console.log(articulo.resultadoImagen12)
      await articulo.save();
    }

    console.log("Número de registros actualizados:", articulos.length);
    console.log("Actualización completa!");
    res.json({
      message: "Actualización completa"
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      error: "Error al actualizar"
    });
  }
});






router.post('/actualizar', async (req, res) => {
  try {
    console.log("Actualizando");

    const articulos = await articuloModel.find({ posicion: '5' });

    // Utilizamos Promise.all para manejar múltiples operaciones asincrónicas de manera eficiente
    await Promise.all(articulos.map(async (articulo) => {
      if (!articulo.categoria || articulo.categoria.trim() === '') {
        // Usamos try-catch dentro del ciclo para manejar errores de actualización individuales
        try {
          await articuloModel.updateOne({
            _id: articulo._id
          }, {
            $set: {
              categoria: "Montañas del mundo · Noticias"
            }
          });

          console.log("Actualizando artículo:", articulo._id);
        } catch (updateError) {
          console.error("Error al actualizar artículo:", articulo._id, updateError);
        }
      }
    }));

    console.log("Actualización completa!");
    res.json({
      message: "Actualización completa"
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      error: "Error al actualizar"
    });
  }
});




 function extractCustomText(code) {
  let countValidRecords = 0; // Variable para contar registros válidos

  const porIndex = code.indexOf('Por ');
  if (porIndex !== -1) {
    const endIndex = Math.min(
      code.indexOf('-', porIndex),
      code.indexOf('</', porIndex),
      code.indexOf('<', porIndex),
    );

    if (endIndex !== -1) {
      const extractedText = code.substring(porIndex + 4, endIndex).trim();
      if (extractedText.length > 60) {
        return "";
      }
      
      if (extractedText !== "") {
        countValidRecords++; // Aumentar el contador si el registro es válido y no está vacío
      }

      return extractedText;
    }
  }
  return "";
}

function extractCustomText2(code) {
  let countValidRecords = 0; // Variable para contar registros válidos

  const notasIndex = code.indexOf('Notas relacionadas');
  if (notasIndex !== -1) {
    const extractedText = code.substring(notasIndex, code.length).trim();
    
    if (extractedText.length > 60) {
      return "";
    }
    
    if (extractedText !== "") {
      countValidRecords++; // Aumentar el contador si el registro es válido y no está vacío
    }

    return extractedText;
  }

  return "";
}





// Llamada a la función con diferentes códigos y recuento total al final
const codes = [
  // ... códigos aquí ...
];

let totalCount = 0;
for (const code of codes) {
  const result = extractCustomText(code);
  console.log(result);
  if (result !== "") {
    totalCount++;
  }
}

console.log("Total de registros distintos a '':", totalCount);




 
 function extractImageURL(code) {
   const regex = /<img[^>]*src="([^"]+)"/g;
   const matches = code.match(regex);
 
   if (matches && matches.length >= 2) {
     const match = matches[1];
     if (match) {
       const urlMatch = match.match(/src="([^"]+)"/);
       if (urlMatch && urlMatch[1]) {
         return urlMatch[1];
       }
     }
   }
 
   return null;
 }
 
 module.exports = router;
 


 router.post('/' ,   async (req, res)=>{ 
    const articulos = new articuloModel({
      
  contadorComentarios:req.body.contadorComentarios,
  comentarios:req.body.comentarios, 
  correos:req.body.correos,
  id:req.body.id,
  marginLeft:req.body.marginLeft,
  popup:req.body.popup,
  popupLink:req.body.popupLink,
  fecha:req.body.fecha,
  fechaMod:req.body.fechaMod,
  provincia:req.body.provincia,

  art1:req.body.art1,
  art2:req.body.art2,
  art3:req.body.art3,
  art4:req.body.art4,
  art5:req.body.art5,
  art6:req.body.art6,
  art7:req.body.art7,
  art8:req.body.art8,
  art9:req.body.art9,
  art10:req.body.art10,
  art11:req.body.art11,
  art12:req.body.art12,
  posicion:req.body.posicion,
  
  
  titulo:req.body.titulo,
  tituloAlt:req.body.tituloAlt,
  subtitulo:req.body.subtitulo,
  hash:req.body.hash,
  nota:req.body.nota,
  imagen1:req.body.imagen1,
  imagen2:req.body.imagen2,
  imagen3:req.body.imagen3,
  fotografia:req.body.fotografia,
  edicionFotografia:req.body.edicionFotografia,
  autor:req.body.autor,

  categoria:req.body.categoria,
  likes:req.body.likes,
  vistas:req.body.vistas,
  tituloImagen:req.body.tituloImagen,
  
  resultadoID:req.body.resultadoID,
  resultadoID2:req.body.resultadoID2,
  resultadoID3:req.body.resultadoID3,
  resultadoID4:req.body.resultadoID4,
  resultadoID5:req.body.resultadoID5,
  resultadoID6:req.body.resultadoID6,
  resultadoID7:req.body.resultadoID7,
  resultadoID8:req.body.resultadoID8,
  resultadoID9:req.body.resultadoID9,
  resultadoID10:req.body.resultadoID10,
  resultadoID11:req.body.resultadoID11,
  resultadoID12:req.body.resultadoID12,



  resultadoCategoria:req.body.resultadoCategoria,
  resultadoCategoria2:req.body.resultadoCategoria2,
  resultadoCategoria3:req.body.resultadoCategoria3,
  resultadoCategoria4:req.body.resultadoCategoria4,
  resultadoCategoria5:req.body.resultadoCategoria5,
  resultadoCategoria6:req.body.resultadoCategoria6,
  resultadoCategoria7:req.body.resultadoCategoria7,
  resultadoCategoria8:req.body.resultadoCategoria8,
  resultadoCategoria9:req.body.resultadoCategoria9,
  resultadoCategoria10:req.body.resultadoCategoria10,
  resultadoCategoria11:req.body.resultadoCategoria11,
  resultadoCategoria12:req.body.resultadoCategoria12,


  resultadoImagen:req.body.resultadoImagen,
  resultadoImagen2:req.body.resultadoImagen2,
  resultadoImagen3:req.body.resultadoImagen3,
  resultadoImagen4:req.body.resultadoImagen4,
  resultadoImagen5:req.body.resultadoImagen5,
  resultadoImagen6:req.body.resultadoImagen6,
  resultadoImagen7:req.body.resultadoImagen7,
  resultadoImagen8:req.body.resultadoImagen8,
  resultadoImagen9:req.body.resultadoImagen9,
  resultadoImagen10:req.body.resultadoImagen10,
  resultadoImagen11:req.body.resultadoImagen11,
  resultadoImagen12:req.body.resultadoImagen12,

  autor1:req.body.autor1,
  autor2:req.body.autor2,
  autor3:req.body.autor3,
  autor4:req.body.autor4,
  autor5:req.body.autor5,
  autor6:req.body.autor6,
  autor7:req.body.autor7,
  autor8:req.body.autor8,
  autor9:req.body.autor9,
  autor10:req.body.autor10,
  autor11:req.body.autor11,
  autor12:req.body.autor12,
   
     
        

    });
       await articulos.save();
       res.json('Articulo creado!');

});

 // ++++++++++++++++++++++   GET Articulo provincia  ++++++++++++++++++++++++++++++++++++
 
 router.get('/provincia/:_id' , async(req,res) => { 
  var aux = String(req.params._id)
  

    try {
        const articulo = await articuloModel.find({provincia : aux})       

          res.json(articulo)  
         
               
      } catch (err) {
        res.json('ID no encontrado..')
      }

});

// aca vamos hacer la parte de que busca los articulos viejos
router.get('/buscar/:_id', async (req, res) => {

  const aux = String(req.params._id);
  const palabras = aux.split('-'); // Dividir las palabras por el '+'
console.log(aux)
  if (palabras.length < 2) {
    return res.status(400).json('Se requieren al menos dos palabras separadas por un "+"');
  }

  try {
    const palabra1 = palabras[0];
    const palabra2 = palabras[1];
    

    // Utiliza una expresión regular para buscar títulos que contengan ambas palabras
    const articulo = await articuloModel.find({
      titulo: { $regex: `${palabra1}.*${palabra2}`, $options: 'i' }, // El uso de $options: 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas
    });

    if (articulo.length > 0) {
      console.log(articulo)
      res.json(articulo[0]);
    } else {
      res.json('No se encontraron resultados.');
    }
  } catch (err) {
    res.status(500).json('Error en el servidor.');
  }
});







 // ++++++++++++++++++++++   GET ONEEEE  ++++++++++++++++++++++++++++++++++++
 
router.get('/:_id' , async(req,res) => { 
  var aux = String(req.params._id)
  console.log(aux)

    try {
        const articulo = await articuloModel.findById({_id : aux})    
        if (articulo === null)   { 
          const articulo = await articuloModel.findOne({indice : aux})  
        
          res.json(articulo)

        }else { 

          res.json(articulo)

        }
   
        
  
               
      } catch (err) {
        res.json('ID no encontrado..')
      }

});



 // ++++++++++++++++++++++  MODIFY  ++++++++++++++++++++++++++++++++++++

 router.put('/:_id', async (req,res) => {
    console.log("sasas")
    const { _id } = req.params;
    const articulo = { 
        contadorComentarios:req.body.contadorComentarios,
        comentarios:req.body.comentarios, 
        correos:req.body.correos,
        id:req.body.id,
        marginLeft:req.body.marginLeft,
        fecha:req.body.fecha,
        fechaMod:req.body.fechaMod,
        popupLink:req.body.popupLink,
        popup:req.body.popup,
        provincia:req.body.provincia,
        art1:req.body.art1,
        art2:req.body.art2,
        art3:req.body.art3,
        art4:req.body.art4,
        art5:req.body.art5,
        art6:req.body.art6,
        art7:req.body.art7,
        art8:req.body.art8,
        art9:req.body.art9,
        art10:req.body.art10,
        art11:req.body.art11,
        art12:req.body.art12,

        posicion:req.body.posicion,
        
        
        titulo:req.body.titulo,
        tituloAlt:req.body.tituloAlt,
        subtitulo:req.body.subtitulo,
        hash:req.body.hash,
        nota:req.body.nota,
        imagen1:req.body.imagen1,
        imagen2:req.body.imagen2,
        imagen3:req.body.imagen3,
        fotografia:req.body.fotografia,
        edicionFotografia:req.body.edicionFotografia,
        autor:req.body.autor,
      
        categoria:req.body.categoria,
        likes:req.body.likes,
        vistas:req.body.vistas,
        tituloImagen:req.body.tituloImagen,
        
        resultadoID:req.body.resultadoID,
        resultadoID2:req.body.resultadoID2,
        resultadoID3:req.body.resultadoID3,
        resultadoID4:req.body.resultadoID4,
        resultadoID5:req.body.resultadoID5,
        resultadoID6:req.body.resultadoID6,
        resultadoID7:req.body.resultadoID7,
        resultadoID8:req.body.resultadoID8,
        resultadoID9:req.body.resultadoID9,
        resultadoID10:req.body.resultadoID10,
        resultadoID11:req.body.resultadoID11,
        resultadoID12:req.body.resultadoID12,

      
      
      
        resultadoCategoria:req.body.resultadoCategoria,
        resultadoCategoria2:req.body.resultadoCategoria2,
        resultadoCategoria3:req.body.resultadoCategoria3,
        resultadoCategoria4:req.body.resultadoCategoria4,
        resultadoCategoria5:req.body.resultadoCategoria5,
        resultadoCategoria6:req.body.resultadoCategoria6,
        resultadoCategoria7:req.body.resultadoCategoria7,
        resultadoCategoria8:req.body.resultadoCategoria8,
        resultadoCategoria9:req.body.resultadoCategoria9,
        resultadoCategoria10:req.body.resultadoCategoria10,
        resultadoCategoria11:req.body.resultadoCategoria11,
        resultadoCategoria12:req.body.resultadoCategoria12,

      
      
        resultadoImagen:req.body.resultadoImagen,
        resultadoImagen2:req.body.resultadoImagen2,
        resultadoImagen3:req.body.resultadoImagen3,
        resultadoImagen4:req.body.resultadoImagen4,
        resultadoImagen5:req.body.resultadoImagen5,
        resultadoImagen6:req.body.resultadoImagen6,
        resultadoImagen7:req.body.resultadoImagen7,
        resultadoImagen8:req.body.resultadoImagen8,
        resultadoImagen9:req.body.resultadoImagen9,
        resultadoImagen10:req.body.resultadoImagen10,
        resultadoImagen11:req.body.resultadoImagen11,
        resultadoImagen12:req.body.resultadoImagen12,

        autor1:req.body.autor1,
        autor2:req.body.autor2,
        autor3:req.body.autor3,
        autor4:req.body.autor4,
        autor5:req.body.autor5,
        autor6:req.body.autor6,
        autor7:req.body.autor7,
        autor8:req.body.autor8,
        autor9:req.body.autor9,
        autor10:req.body.autor10,
        autor11:req.body.autor11,
        autor12:req.body.autor12,
              };
    
       await articuloModel.findByIdAndUpdate(_id, {$set: articulo}, {new: true});
       res.json({"_id":_id});

});


router.delete('/:_id', async (req,res) => {
  const { _id } = req.params;
    await articuloModel.findByIdAndDelete(_id);
      res.json("Eliminado!");
});





// router.post('/signup' , async (req, res)=>{ 

 
//  const { email, password } = req.body
//  const newUser = new User({ email, password })
//   await newUser.save() 

// const token = jwt.sign({_id: newUser._id}, 'secretKey' )
//  res.status(200).json({token})

// })

// router.post('/signin', async (req,res)=>{
// const {email, password} = req.body;
// const user = await User.findOne({email});
// if(!user) return res.status(400).send('No exite usuario');
// if(user.password  !== password) return res.status(401).send('Contraseña incorrecta');
// const token = jwt.sign({_id: user._id},'secretKey')
// console.log(token)
// return res.json(token)

// })
// router.get('tareas'){}; 


// router.get('public', (req,res)=>{
//     res.json([{
//         _id:'1' ,
//         name:'teste',
//         descripcion:'quepaso',
//         date:'Hoy es lunes'
    
//     }])

// });

// router.get('tareas'){};  ATENCION ACA EJEMPLO DE COMO VALIDAR PEDIR TOKEN EN UN GET , verifyToken,
// router.get('private', verifyToken, (req,res)=>{
//     res.json([{
//         _id:'1' ,
//         name:'teste',
//         descripcion:'quepaso',
//         date:'Hoy es lunes'
    
//     }])

// })
    


module.exports = router


function verifyToken(req, res, next){
    if(!req.headers.authorization) {
    return res.status(401).send('Sin autorizacion')
}
const token = req.headers.authorization.split(' ')[1]
        if (token === "null"){
            return res.status(401).send('Sin autorizacion')
        }

const payload = jwt.verify(token, 'secretKey')
            req.userID = payload._id
            next();

}
