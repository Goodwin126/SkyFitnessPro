import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ИСПРАВЛЕНИЕ 1: Единый ключ 'accessToken' везде
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);

  // loading = true, пока мы проверяем валидность токена запросом к /me
  const [loading, setLoading] = useState(!!token);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Login failed');

    // ИСПРАВЛЕНИЕ 1: Сохраняем под тем же ключом
    localStorage.setItem('accessToken', data.accessToken);
    setToken(data.accessToken);

    // Если бэкенд сразу отдает юзера в ответе на логин - можно раскомментировать:
    // setUser(data.user);
    // Но лучше довериться проверке через /me ниже

    return data;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
    // Не сбрасываем loading, пусть он остается false, так как мы явно вышли
  };

  useEffect(() => {
    // Если токена нет вообще - мы не грузимся, сразу готовы
    if (!token) {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        // Запрос к эндпоинту /me для проверки токена и получения данных
        const res = await fetch('http://localhost:3001/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          // ВАЖНО: Проверь структуру ответа бэкенда!
          // Если бэкенд возвращает просто объект юзера: setUser(data)
          // Если бэкенд возвращает { user: {...} }: setUser(data.user)
          setUser(data);
        } else {
          console.warn('Token invalid or expired, logging out');
          logout();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        logout();
      } finally {
        // ИСПРАВЛЕНИЕ 3: Только когда запрос закончен, выключаем лоадер
        setLoading(false);
      }
    };

    initAuth();
  }, [token]); // Запускается, когда появляется токен

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
