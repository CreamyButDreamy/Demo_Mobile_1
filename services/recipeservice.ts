import { Recipe, RecipeListResponse } from "../types/recipe";
import { delay, validateApiResponse } from "../utils/delay";

const BASE_URL = "https://dummyjson.com/recipes";

export async function fetchRecipes(): Promise<Recipe[]> {
  await delay(600);

  const response = await fetch(`${BASE_URL}?limit=15`);
  if (!response.ok) {
    throw new Error(
      `Gagal memuat resep dari server (Status: ${response.status})`,
    );
  }

  const data: RecipeListResponse = await response.json();
  return data.recipes;
}

export function fetchRecipeById(id: number | string): Promise<Recipe> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          return validateApiResponse(
            false,
            `Resep dengan ID ${id} tidak ditemukan`,
          ).then(() => {
            throw new Error("Resep tidak ditemukan di server");
          });
        }
        return response.json();
      })
      .then((recipe: Recipe) => {
        resolve(recipe);
      })
      .catch((error) => {
        reject(error instanceof Error ? error : new Error(String(error)));
      });
  });
}

export function searchRecipesFromApi(query: string): Promise<Recipe[]> {
  return fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal melakukan pencarian resep");
      }
      return response.json();
    })
    .then((result: RecipeListResponse) => {
      return result.recipes;
    });
}
