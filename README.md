### Wymagania Funkcjonalności:

**1. Lista nawigacji:**
- Wyświetla listę elementów nawigacji z nazwą (label) oraz URL (url).
- Umożliwia drag & drop elementów w celu zmiany kolejności.
- Każdy element powinien zawierać przycisk do edycji.

**3. Formularz tworzenia nawigacji:**
- Umożliwia dodanie nowego elementu nawigacji z polami:
  - Nazwa (label) - wymagane.
  - URL (url) - opcjonalne.
  - Możliwość dodania pod-elementów (rekursywnie).
- Walidacja pól (np. wymaganie wypełnienia pola label).

**4. Formularz edycji nawigacji:**
- Umożliwia edycję istniejącego elementu nawigacji, łącznie z jego podelementami.

### Technologie:
- Frontend: Next.js
- Stylizacja: Tailwind CSS
- Drag & Drop: dnd-kit
- Formularze i walidacja: Dowolna biblioteka do obsługi formularzy i walidacji (np. React Hook Form, Formik lub Zod).
- Zarządzanie stanem: Możesz użyć lokalnego stanu
