// Импортируем функцию
import {calculateLeaderboardPlaces} from './index'

// we DO NOT CHECK validity of data (tech requirements)
describe('calculateLeaderboardPlaces', () => {
    it('should skip first three places', () => {
        const users = [
            {userId: "id1", score: 3},
            {userId: "id2", score: 2},
            {userId: "id3", score: 1},
        ];
        const minScores = {firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10}

        const result = calculateLeaderboardPlaces(users, minScores);
        expect(result).toEqual([
            {userId: "id1", place: 4},
            {userId: "id2", place: 5},
            {userId: "id3", place: 6},
        ]);
    });

    it('should skip second and third place', () => {
        const users = [
            {userId: "id1", score: 100},
            {userId: "id2", score: 3},
            {userId: "id3", score: 2},
            {userId: "id4", score: 1},
        ];
        const minScores = {firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10};

        const result = calculateLeaderboardPlaces(users, minScores);
        expect(result).toEqual([
            {userId: "id1", place: 1},
            {userId: "id2", place: 4},
            {userId: "id3", place: 5},
            {userId: "id4", place: 6},
        ]);
    });

    it('should grant all prize places to users', () => {
        const users = [
            {userId: 'u1', score: 100},
            {userId: 'u2', score: 90},
            {userId: 'u3', score: 80},
        ];
        const minScores = {
            firstPlaceMinScore: 50,
            secondPlaceMinScore: 40,
            thirdPlaceMinScore: 30,
        };

        const result = calculateLeaderboardPlaces(users, minScores);
        expect(result).toEqual([
            {userId: 'u1', place: 1},
            {userId: 'u2', place: 2},
            {userId: 'u3', place: 3},
        ]);
    });

    it('should correctly calculate all places', () => {
        const users = [
            {userId: 'u4', score: 70},
            {userId: 'u5', score: 60},
            {userId: 'u6', score: 50},
            {userId: 'u1', score: 100},
            {userId: 'u2', score: 90},
            {userId: 'u3', score: 80},
        ];
        const minScores = {
            firstPlaceMinScore: 90,
            secondPlaceMinScore: 70,
            thirdPlaceMinScore: 60,
        };

        const result = calculateLeaderboardPlaces(users, minScores);
        expect(result).toEqual([
            {userId: 'u1', place: 1},
            {userId: 'u2', place: 2},
            {userId: 'u3', place: 3},
            {userId: 'u4', place: 4},
            {userId: 'u5', place: 5},
            {userId: 'u6', place: 6},
        ]);
    });

    it('should grant one user his earned place', () => {
        const users = [{userId: 'u1', score: 150}];
        const minScores = {
            firstPlaceMinScore: 200,
            secondPlaceMinScore: 180,
            thirdPlaceMinScore: 130,
        };

        const result = calculateLeaderboardPlaces(users, minScores);
        expect(result).toEqual([{userId: 'u1', place: 3}]);
    });

    test('case 1', () => {
        const result = calculateLeaderboardPlaces(
            [
                {userId: "id1", score: 3},
                {userId: "id2", score: 2},
                {userId: "id3", score: 1},
            ],
            {firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10}
        );
        expect(result).toEqual([
            {userId: "id1", place: 4},
            {userId: "id2", place: 5},
            {userId: "id3", place: 6},
        ]);
    });

    test('case 2', () => {
        const result = calculateLeaderboardPlaces(
            [
                {userId: "id1", score: 100},
                {userId: "id2", score: 3},
                {userId: "id3", score: 2},
                {userId: "id4", score: 1},
            ],
            {firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10}
        )
        expect(result).toEqual([
            {userId: "id1", place: 1},
            {userId: "id2", place: 4},
            {userId: "id3", place: 5},
            {userId: "id4", place: 6},
        ]);
    });

    test('case 3', () => {
        const result = calculateLeaderboardPlaces([{userId: "id1", score: 55}], {
            firstPlaceMinScore: 100,
            secondPlaceMinScore: 50,
            thirdPlaceMinScore: 10,
        });
        expect(result).toEqual([{userId: "id1", place: 2}]);
    });
});
