-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Мар 20 2020 г., 16:05
-- Версия сервера: 5.6.47-cll-lve
-- Версия PHP: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u31600_resume`
--

-- --------------------------------------------------------

--
-- Структура таблицы `react_task_1_users`
--

CREATE TABLE `react_task_1_users` (
  `id` int(8) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` varchar(8) NOT NULL,
  `hash` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `react_task_1_users`
--

INSERT INTO `react_task_1_users` (`id`, `email`, `password`, `role`, `hash`) VALUES
(1, 'adminTask1@ent', '09d1d20bd495912ed5307a08510440d6', 'admin', '1e056d2b0ebd5c878c550da6ac5d3724'),
(2, 'adminTask2@ent', 'c81e728d9d4c2f636f067f89cc14862c', 'admin', '819f46e52c25763a55cc642422644317'),
(3, 'adminTask3@ent', 'a87ff679a2f3e71d9181a67b7542122c', 'user', ''),
(4, 'userTask4@ent', 'a87ff679a2f3e71d9181a67b7542122c', 'user', '10a7cdd970fe135cf4f7bb55c0e3b59f'),
(5, 'adminTask6@ent', '1679091c5a880faf6fb5e6087eb1b2dc', 'user', ''),
(6, 'adminTask12@ent', 'c20ad4d76fe97759aa27a0c99bff6710', 'user', ''),
(7, 'adminTask123@ent', '202cb962ac59075b964b07152d234b70', 'admin', '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `react_task_1_users`
--
ALTER TABLE `react_task_1_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `react_task_1_users`
--
ALTER TABLE `react_task_1_users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
