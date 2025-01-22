/**
 * ТРЕБОВАНИЕ:
 *
 * Необходимо реализовать функцию calculateLeaderboardPlaces.
 * Функция распределяет места пользователей, учитывая ограничения для получения первых мест и набранные пользователями очки.
 * Подробное ТЗ смотреть в readme.md

 * Файл preview.png носит иллюстративный характер, не нужно релизовывать UI!
 * Реализованную функцию прислать в виде js файла
 */

/**
 * ТЕХНИЧЕСКИЕ ОГРАНИЧЕНИЯ:
 *
 * количество очков это всегда целое положительное число
 * firstPlaceMinScore > secondPlaceMinScore > thirdPlaceMinScore > 0
 * в конкурсе участвует от 1 до 100 пользователей
 * 2 пользователя не могут набрать одинаковое количество баллов (разные баллы у пользователей гарантируются бизнес-логикой, не стоит усложнять алгоритм)
 * нет ограничений на скорость работы функции и потребляемую ей память
 * при реализации функции разрешается использование любых библиотек, любого стиля написания кода
 * в функцию передаются только валидные данные, которые соответствуют предыдущим ограничениям (проверять это в функции не нужно)
 */

/**
 * ВХОДНЫЕ ДАННЫЕ:
 *
 * @param users - это список пользователей и заработанные каждым из них очки,
 * это неотсортированный массив вида [{userId: "id1", score: score1}, ... , {userId: "idn", score: scoreN}], где score1 ... scoreN положительные целые числа, id1 ... idN произвольные неповторяющиеся идентификаторы
 *
 * @param minScores - это значения минимального количества очков для первых 3 мест
 * это объект вида { firstPlaceMinScore: score1, secondPlaceMinScore: score2, thirdPlaceMinScore : score3 }, где score1 > score2 > score3 > 0 целые положительные числа
 */

/**
 * РЕЗУЛЬТАТ:
 *
 * Функция должна вернуть пользователей с занятыми ими местами
 * Массив вида (сортировка массива не важна): [{userId: "id1", place: user1Place}, ..., {userId: "idN", place: userNPlace}], где user1Place ... userNPlace это целые положительные числа равные занятым пользователями местами, id1 ... idN идентификаторы пользователей из массива users
 */

type UserId = string
type AnswerType = Array<{ userId: UserId, place: number }>

export function calculateLeaderboardPlaces(users: Array<{ userId: UserId, score: number }>, minScores: {
    firstPlaceMinScore: number,
    secondPlaceMinScore: number,
    thirdPlaceMinScore: number
}): AnswerType {
    let currentPlace = 0

    const modifiedMinScores: { [key: string]: number } = {
        1: minScores.firstPlaceMinScore,
        2: minScores.secondPlaceMinScore,
        3: minScores.thirdPlaceMinScore,
    }

    return users
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((item) => {
            currentPlace++

            while (modifiedMinScores[currentPlace] !== undefined && item.score < modifiedMinScores[currentPlace]) {
                currentPlace++
            }

            return {
                userId: item.userId,
                place: currentPlace
            }
        })
}

// функция-helper, ее модифицировать не нужно
function checkResult(answer: AnswerType, correctAnswer: AnswerType) {
    if (!answer) return false;
    if (!Array.isArray(answer)) return false;
    if (answer.length !== correctAnswer.length) return false;

    for (let i = 0; i < correctAnswer.length; i++) {
        const correctAnswerElement = correctAnswer[i];

        const answerElement = answer.find(
            (x) => x.userId === correctAnswerElement.userId
        );
        if (!answerElement) return false;

        if (String(answerElement.place) !== String(correctAnswerElement.place))
            return false;
    }

    return true;
}

// moved test cases to tests
