#[tauri::command]
pub fn sing(name: &str) -> String {
  format!("ONE OK ROCK {name}")
}
