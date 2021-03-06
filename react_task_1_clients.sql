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
-- Структура таблицы `react_task_1_clients`
--

CREATE TABLE `react_task_1_clients` (
  `id` int(8) NOT NULL,
  `FirstName` varchar(32) NOT NULL,
  `LastName` varchar(32) NOT NULL,
  `City` varchar(32) NOT NULL,
  `Address` varchar(128) NOT NULL,
  `Phone` varchar(64) NOT NULL,
  `CreationDate` varchar(32) NOT NULL,
  `EditingDate` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `react_task_1_clients`
--

INSERT INTO `react_task_1_clients` (`id`, `FirstName`, `LastName`, `City`, `Address`, `Phone`, `CreationDate`, `EditingDate`) VALUES
(77, 'Диана', 'Суботина', 'Чернигов', 'Малая 12, 88', '380507002053', '1584689244', '1584690489'),
(76, 'Олег', 'Никольников', 'Сумы', 'Харьковская 22/18', '380507002033;380507002011;380507002029', '1584689133', '1584692210'),
(74, 'Эвелина', 'Ершова', 'Киев', 'Мечникова 2', '380507002010;380507002011', '1584688778', '1584692265'),
(75, 'Инна', 'Турова', 'Киев', 'Правды 14', '380672021518', '1584688967', '1584690364'),
(71, 'Всеслав', 'Бакрылов', 'Таганрог', 'Славы 15, 48/10', '380507002153;380507002003;380507002149', '1584678658', '1584692067'),
(70, 'Надежда', 'Балабанова', 'Киев', 'Победы 4', '380507002093;380507000093;380507002089', '1584678541', '1584692154'),
(69, 'Богдан', 'Карташов', 'Харьков', 'Сумская 24', '380507002113;380507002400;380507002109', '1584678367', '1584691953'),
(68, 'Вероника', 'Шеншина', 'Сумы', 'Заречная 18, 75/10', '380507002073;380507002280', '1584678333', '1584691963'),
(67, 'Мария', 'Тихонова', 'Львов', 'Б.Хмельницкого 40', '380507002133', '1584678326', '1584690656'),
(66, 'Федор', 'Иванов', 'Белгород', 'Маяковского 4/8', '380506008070', '1584641553', '1584641553'),
(65, 'Яша', 'Иванов', 'Чугуев', 'Победы 4', '380507771155', '1584635708', '1584635708'),
(64, 'Лев', 'Гремпель', 'Киев', 'Бубушкина 4/ 12', '380507002593', '1584635542', '1584692350'),
(29, 'Елена', 'Саянкова', 'Умань', 'Религии 70, 12/40', '380507002173;380507002103;380507002169', '1584565747', '1584692029'),
(31, 'Агап', 'Теплухин', 'Белгород', 'Московская 40, 52/1В', '380507002393;380507002111', '1584566294', '1584691918'),
(32, 'Роза', 'Райкова', 'Черновцы', 'В.Стуса 4.', '380507002213;380507000013', '1584566466', '1584692238'),
(33, 'Захар', 'Нагиев', 'Сумы', 'Плетневская 12', '380507002233;380507002202;380507002229', '1584566653', '1584692084'),
(34, 'Дарья', 'Мерзлова', 'Лубны', 'Энгельса 31', '380507002373;380507002304', '1584566656', '1584692012'),
(35, 'Поликарп', 'Привалов', 'Ровно', 'Энергетиков 1/25', '380507002253;380507002213', '1584566776', '1584692227'),
(36, 'Сергей', 'Уманов', 'Полтава', 'Харьковская 8', '380507002273;380507002200;380507002269', '1584566777', '1584692251'),
(37, 'Лада', 'Терехова', 'Москва', 'Собянина - 800', '380507002473;380507002401;380507002469', '1584566817', '1584692111'),
(38, 'Герман', 'Ганичев', 'Луганск', 'Мирная 7', '380507002533;380507002500;380507002529', '1584566818', '1584692000'),
(39, 'Нестор', 'Чюличков', 'Чернигов', 'Европы 11', '380507002453;380507002113', '1584566819', '1584692182'),
(40, 'Алексей', 'Канкия', 'Сумы', 'Ревуцкого 11', '380507002513;380507000003;380507002509', '1584566831', '1584691941'),
(41, 'Майя', 'Козырева', 'Харьков', 'Сумская 10', '380502214222;380502222202', '1584566832', '1584692138'),
(42, 'Александр', 'Кручинина', 'Полтава', 'Морозова 13А', '380507002433;380507002223;380507002429', '1584566891', '1584691930'),
(43, 'Кир', 'Жичкин', 'Краматорск', 'Сталеваров 14', '380507002320;380507002300;380507002309', '1584566893', '1584692100'),
(44, 'Нона', 'Доскаль', 'Сумы', 'Торгонская 12', '380507002420;380507002020', '1584566930', '1584692196'),
(45, 'Всеволод', 'Курчатова', 'Чугуев', 'Малая кольцевая 1', '380507002493;380507002147', '1584566931', '1584691984'),
(59, 'Нестор', 'Колобков', 'Славянск', 'Штэпы 14', '380507002333;380507002003', '1584567544', '1584692168'),
(60, 'Людмила', 'Ягешева', 'Киев', 'Ломонова 91', '380507002353;380507002381;380507002349', '1584567550', '1584692123'),
(61, 'Жанна', 'Элефтерова', 'Донецк', 'Мира 8', '380507002553;380507002053', '1584577476', '1584692050'),
(62, 'Алиса', 'Берёзкина', 'Чернигов', 'Бульбы 11', '380507002580;380507002573;380507002569', '1584578496', '1584692322'),
(63, 'Влада', 'Ховрунова', 'Б.Церковь', 'Одесская 5', '380507002193', '1584580570', '1584691970');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `react_task_1_clients`
--
ALTER TABLE `react_task_1_clients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `react_task_1_clients`
--
ALTER TABLE `react_task_1_clients`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
