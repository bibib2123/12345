// main.js

document.addEventListener('DOMContentLoaded', function () {
  // Регистрация
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const firstName = registerForm.firstName.value.trim();
      const lastName = registerForm.lastName.value.trim();
      const phone = registerForm.phone.value.trim();
      const email = registerForm.email.value.trim();
      const login = registerForm.login.value.trim();
      const password = registerForm.password.value;
      const errorDiv = document.getElementById('registerError');
      errorDiv.textContent = '';
      const loginRegex = /^[А-Яа-яЁё]{6,}$/;
      const phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
      if (!loginRegex.test(login)) {
        errorDiv.textContent = 'Логин должен быть на кириллице и не менее 6 символов.';
        return;
      }
      if (password.length < 6) {
        errorDiv.textContent = 'Пароль должен быть не менее 6 символов.';
        return;
      }
      if (!phoneRegex.test(phone)) {
        errorDiv.textContent = 'Телефон должен быть в формате +7(XXX)-XXX-XX-XX.';
        return;
      }
      if (!email.match(/^\S+@\S+\.\S+$/)) {
        errorDiv.textContent = 'Некорректный email.';
        return;
      }
      errorDiv.style.color = '#388e3c';
      errorDiv.textContent = 'Регистрация успешна (визуально)!';
      registerForm.reset();
    });
  }

  // Авторизация
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = loginForm.login.value.trim();
      const password = loginForm.password.value;
      const errorDiv = document.getElementById('loginError');
      errorDiv.textContent = '';
      if (!login || !password) {
        errorDiv.textContent = 'Введите логин и пароль.';
        return;
      }
      // Визуальная проверка
      if (login === 'admin' && password === 'restaurant') {
        window.location.href = 'admin.html';
        return;
      }
      errorDiv.textContent = 'Неверный логин или пароль (визуально).';
    });
  }

  // Бронирование
  const reserveForm = document.getElementById('reserveForm');
  if (reserveForm) {
    reserveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const date = reserveForm.date.value;
      const time = reserveForm.time.value;
      const guests = reserveForm.guests.value;
      const phone = reserveForm.phone.value.trim();
      const errorDiv = document.getElementById('reserveError');
      errorDiv.textContent = '';
      const phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
      if (!date || !time || !guests || !phone) {
        errorDiv.textContent = 'Заполните все поля.';
        return;
      }
      if (guests < 1 || guests > 10) {
        errorDiv.textContent = 'Количество гостей от 1 до 10.';
        return;
      }
      if (!phoneRegex.test(phone)) {
        errorDiv.textContent = 'Телефон должен быть в формате +7(XXX)-XXX-XX-XX.';
        return;
      }
      errorDiv.style.color = '#388e3c';
      errorDiv.textContent = 'Заявка отправлена (визуально)!';
      reserveForm.reset();
    });
  }

  // Админ-панель (визуальная логика)
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminPanel = document.getElementById('adminPanel');
  if (adminLoginForm && adminPanel) {
    adminLoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = adminLoginForm.login.value.trim();
      const password = adminLoginForm.password.value;
      const errorDiv = document.getElementById('adminLoginError');
      errorDiv.textContent = '';
      if (login === 'admin' && password === 'restaurant') {
        adminLoginForm.style.display = 'none';
        adminPanel.style.display = 'block';
        // Визуальная заглушка бронирований
        const tbody = document.querySelector('#adminBookingsTable tbody');
        tbody.innerHTML = `<tr><td>1</td><td>Иван Иванов</td><td>2024-06-10</td><td>19:00</td><td>4</td><td>+7(999)-123-45-67</td><td>Новое</td><td><button>Посещение состоялось</button> <button>Отменено</button></td></tr>`;
      } else {
        errorDiv.textContent = 'Неверный логин или пароль.';
      }
    });
  }

  // Мои бронирования (визуальная заглушка)
  const bookingsList = document.getElementById('bookingsList');
  const reviewSection = document.getElementById('reviewSection');
  if (bookingsList) {
    bookingsList.innerHTML = `<div class="booking-item"><b>Дата:</b> 2024-06-10, <b>Время:</b> 19:00, <b>Гости:</b> 4, <b>Статус:</b> <span id="bookingStatus">Посещение состоялось</span></div>`;
    // Показываем форму отзыва только если статус "Посещение состоялось"
    const status = document.getElementById('bookingStatus');
    if (status && status.textContent === 'Посещение состоялось') {
      reviewSection.style.display = 'block';
    }
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        reviewForm.querySelector('button').disabled = true;
        reviewForm.querySelector('textarea').disabled = true;
        reviewForm.querySelector('button').textContent = 'Спасибо за отзыв!';
      });
    }
  }
}); 