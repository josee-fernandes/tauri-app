#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


fn main() {
  use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let _menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu);

  tauri::Builder::default()
    // .menu(_menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
