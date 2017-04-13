using System.Linq;
using RestSharp;

namespace DatBoiPente.Logic.Components
{
    public class Board
    {
        public enum BoardCellState
        {
            Free, FriendlyAi, EnemyAi
        }

        private static int _boardWidth = 19;
        private static int _boardHeight = 19;

        private BoardCellState[][] _boardData = new BoardCellState[Board._boardHeight][];
        private int _friendlyAiPlayerIndex;

        public Board(int playerIndex)
        {
            this._friendlyAiPlayerIndex = playerIndex;
            for (int i = 0; i < Board._boardHeight; i++)
            {
                this._boardData[i] = new BoardCellState[Board._boardWidth];
                for (int j = 0; j < Board._boardWidth; j++)
                {
                    this._boardData[i][j] = 0;
                }
            }
        }

        public void UpdateBoard(JsonArray boardInfo)
        {
            for (int i = 0; i < Board._boardHeight; i++)
            {
                JsonArray row = (JsonArray) boardInfo[i];
                for (int j = 0; j < Board._boardWidth; j++)
                {
                    int data = (int) (long) row[j];
                    this._boardData[i][j] = data == 0 ? BoardCellState.Free : data == _friendlyAiPlayerIndex ? BoardCellState.FriendlyAi : BoardCellState.EnemyAi;
                }
            }
        }
    }
}
