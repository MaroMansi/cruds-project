# CRUDS: Product Management App

This project was built while following the course by Abdelrahman Gamal (عبدالرحمن جمال) on nouvil site.

A simple product management app built with **HTML,and vanilla  CSS ,JavaScript**. It supports the full **C**reate, **R**ead, **U**pdate, **D**elete and **S**earch cycle, and keeps its data in the browser, so no server or database is needed.

To see the website interface, open

CRUDS_Screenshot.png

## Features

- **Create** products with title, price, taxes, ads, discount, count and category.
- **Automatic total**: calculated live as you type (`price + taxes + ads - discount`).
- **Count**: add several copies of the same product in one click.
- **Read**: all products are shown in a table.
- **Update**: load a product back into the form, edit it, then save it in place.
- **Delete** a single product, or **Delete All** (the button shows the current count and hides when there is no data).
- **Search** by product name or by category (case-insensitive, partial match), with a **See All** button to go back to the full list.
- **Data validation**: name, price and category are required; negative values and very large counts are blocked.
- **Persistent data**: products are saved in `localStorage`, so they survive a page refresh.

## Built With

- HTML5
- CSS3
- JavaScript (ES6, no frameworks or libraries)

## Getting Started

No installation is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/<MaroMansi>/<cruds-project>.git
   ```
2. Open the project folder.
3. Open `CRUDS_HTML.html` in your browser.

## How It Works

- Products are stored in an array (`prodata`) and mirrored in `localStorage` under the key `product`, so every change (create, update, delete) is saved again.
- The table is rebuilt from the array every time the data changes (`showdata()`).
- Update mode uses an index variable (`proup`) to remember which product is being edited. The **Create** button changes to **Save** while editing, and leaving the mode (reset, delete, delete all) restores it.
- Search builds a filtered table but keeps each product's original index, so Update and Delete still work on search results.

## Project Structure

```
├── CRUDS_HTML.html
├── CRUDS_style.css
├── CRUDS_JS.js
└── README.md
```

## Known Limitations

- **XSS vulnerability (intentional for this learning project):** the table is built with `innerHTML` from user input, so HTML typed into a field is rendered as HTML. A safer version would build the rows with `createElement` and `textContent`.
- Data lives only in the current browser's `localStorage` (about 5 MB limit) and is not shared between devices.
- Search works by name **or** category, not both at once.

## What I Learned

- Working with the DOM and events.
- Storing and reading data with `localStorage` and `JSON`.
- Building and filtering arrays with loops.
- Structuring a multi-step program with functions and shared state.
- Validating user input, and why `innerHTML` with user input is risky.

## Future Improvements

- Fix the XSS issue by building the table with `createElement` and `textContent`.
- Make the layout fully responsive for mobile.
- Add sorting and filtering by price.
- Add export and import of data (JSON or CSV).

## Author

**Amr Mansi**
