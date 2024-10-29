const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

//OpenAI configuration
const configuration = new Configuration({
  apiKey: "--",
});

const openai = new OpenAIApi(configuration);

app.post("/responseText", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Actúa como un evaluador en una entrevista de trabajo y califica esta respuesta.Dame tu calificación entre 1 a 100 en formato json y dos sugerencias también en formato json Pregunta 1: '¿Cuál es la diferencia entre retesting y regresión?' Respuesta 1: 'El retesting se enfoca en asegurarse de que los cambios recientes no hayan introducido nuevas fallas en el software existente, mientras que la regresión se enfoca en volver a probar una funcionalidad específica después de haberse corregido un defecto'",
      max_tokens: 100,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "Hubo un error con el servidor",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));
