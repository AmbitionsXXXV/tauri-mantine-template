// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

pub mod commands;
pub mod structs;

use commands::fetcher::sing;
use structs::singer::Singer;
use tauri::Manager;

fn main() {
  let singer = Singer {
    name: String::from("ONE OK ROCK"),
    age: 18,
  };

  println!("{:?}", singer);

  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.get_window("main").unwrap().open_devtools(); // `main` is the first window from tauri.conf.json without an explicit label
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![greet, sing])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
