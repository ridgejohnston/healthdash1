
import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { HealthArticle, SearchResult, Ingredient, NutritionalInfo } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

export const searchMedications = async (query: string): Promise<any[]> => {
  if (!process.env.API_KEY) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `You are a pharmaceutical database assistant. Find medications matching the search term "${query}". Search across official pharmaceutical drugs, research peptides, SARMs, vitamins, and minerals. For each result, provide its name, a brief description, and its category.` }]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The common or brand name of the substance." },
              description: { type: Type.STRING, description: "A brief summary of the substance's purpose or function." },
              category: { type: Type.STRING, description: "The category of the substance (e.g., Pharmaceutical, Peptide, SARM, Vitamin, Mineral)." }
            },
            required: ["name", "description", "category"]
          }
        }
      }
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error searching medications:", error);
    return [];
  }
};

export const fetchHealthArticles = async (topics: string[]): Promise<HealthArticle[]> => {
  if (!process.env.API_KEY) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `Find 10 recent, high-quality articles on the following health topics: ${topics.join(', ')}. Source them from highly credible institutions like the Mayo Clinic, NIH, CDC, WHO, Cleveland Clinic, and Johns Hopkins Medicine. For each article, provide the title, a one-sentence summary, the source institution, and the direct URL.` }]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              url: { type: Type.STRING }
            },
            required: ["title", "summary", "source", "url"]
          }
        }
      }
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching health articles:", error);
    return [];
  }
};

export const searchWithGoogle = async (query: string, context: string): Promise<SearchResult | null> => {
  if (!process.env.API_KEY) return null;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `Provide a concise and helpful explanation for "${query}" specifically within the context of ${context}.` }]
      },
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { summary, sources };
  } catch (error) {
    console.error("Error with Google Search grounding:", error);
    return null;
  }
};

export const searchIngredients = async (query: string): Promise<string[]> => {
  if (!process.env.API_KEY) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `List common food ingredients that match the search term "${query}". Provide only a JSON array of strings.` }]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error searching ingredients:", error);
    return [];
  }
};

export const fetchRecipeArticles = async (ingredients: string[]): Promise<SearchResult | null> => {
  if (!process.env.API_KEY || ingredients.length === 0) return null;
  const ingredientsList = ingredients.join(', ');
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: `Find recipes and articles about cooking with ${ingredientsList}. The content should be from fitness chefs, fitness coaches, or medical dietitians. Summarize the findings and provide links.` }]
      },
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { summary, sources };
  } catch (error) {
    console.error("Error fetching recipe articles:", error);
    return null;
  }
};

export const calculateNutrition = async (ingredients: Ingredient[]): Promise<NutritionalInfo | null> => {
  if (!process.env.API_KEY || ingredients.length === 0) return null;

  const ingredientsString = ingredients.map(ing => `${ing.amount} ${ing.unit} of ${ing.name}`).join(', ');
  const prompt = `Analyze the following list of ingredients and calculate the total nutritional values for the entire list combined. The list is: ${ingredientsString}. Provide the total grams of protein, fat, carbohydrates, and sugar.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: prompt }]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            protein: { type: Type.NUMBER, description: "Total grams of protein." },
            fat: { type: Type.NUMBER, description: "Total grams of fat." },
            carbs: { type: Type.NUMBER, description: "Total grams of carbohydrates." },
            sugar: { type: Type.NUMBER, description: "Total grams of sugar, which is a subset of carbohydrates." }
          },
          required: ["protein", "fat", "carbs", "sugar"]
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as NutritionalInfo;
  } catch (error) {
    console.error("Error calculating nutrition:", error);
    return null;
  }
};
