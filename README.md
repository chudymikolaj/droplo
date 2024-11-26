Wymagania Funkcjonalności:
1. Lista nawigacji:
a. Wyświetla listę elementów nawigacji z nazwą (label) oraz URL (url).
b. Umożliwia drag & drop elementów w celu zmiany kolejności.
c. Każdy element powinien zawierać przycisk do edycji.

2. Formularz tworzenia nawigacji:
a. Umożliwia dodanie nowego elementu nawigacji z polami:
i. Nazwa (label) - wymagane.
ii. URL (url) - opcjonalne.
iii. Możliwość dodania pod-elementów (rekursywnie).
b. Walidacja pól (np. wymaganie wypełnienia pola label).

3. Formularz edycji nawigacji:
a. Umożliwia edycję istniejącego elementu nawigacji, łącznie z jego podelementami.

Technologie:
1. Frontend: Next.js
2. Stylizacja: Tailwind CSS
3. Drag & Drop: dnd-kit
4. Formularze i walidacja: Dowolna biblioteka do obsługi formularzy i walidacji 
(np. React Hook Form, Formik lub Zod).
5. Zarządzanie stanem: Możesz użyć lokalnego stanu
