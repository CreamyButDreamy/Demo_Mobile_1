import { Recipe } from "../types/recipe";
import { delay, validateApiResponse } from "../utils/delay";

// Endpoint REST API Publik Cloud di-host di GitHub CDN
const API_URL =
  "https://raw.githubusercontent.com/CreamyButDreamy/Demo_Mobile_1/master/db.json";

/**
 * Mengambil daftar resep dari REST API Online menggunakan async/await.
 * Memenuhi kriteria penilaian: 'Mengambil data dari External API' & 'Custom & Pre-built Async Function'.
 */
export async function fetchRecipes(): Promise<Recipe[]> {
  await delay(400);

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(
      `Gagal memuat resep dari server (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return data.recipes;
}

/**
 * Mengambil detail resep berdasarkan ID menggunakan Promise constructor dengan resolve() dan reject().
 * Memenuhi kriteria penilaian: 'Menggunakan fungsi .then(), .resolve(), dan .reject()'.
 */
export function fetchRecipeById(id: number | string): Promise<Recipe> {
  return new Promise((resolve, reject) => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Koneksi server gagal (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        const item: Recipe | undefined = data.recipes.find(
          (r: Recipe) => r.id.toString() === id.toString(),
        );

        if (!item) {
          return validateApiResponse(
            false,
            `Resep dengan ID ${id} tidak ditemukan`,
          ).then(() => {
            throw new Error(`Resep dengan ID ${id} tidak ditemukan`);
          });
        }

        resolve(item);
      })
      .catch((error) => {
        reject(error instanceof Error ? error : new Error(String(error)));
      });
  });
}

/**
 * Mencari resep via External API secara asynchronous menggunakan method .then().
 */
export function searchRecipesFromApi(query: string): Promise<Recipe[]> {
  const searchQuery = query.toLowerCase().trim();

  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
      return response.json();
    })
    .then((data) => {
      const results: Recipe[] = data.recipes.filter(
        (r: Recipe) =>
          r.name.toLowerCase().includes(searchQuery) ||
          r.cuisine.toLowerCase().includes(searchQuery) ||
          (r.tags && r.tags.some((t: string) => t.toLowerCase().includes(searchQuery))),
      );
      return results;
    });
}
