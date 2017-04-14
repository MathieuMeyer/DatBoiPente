using System;
using System.Collections.Generic;
using System.Linq;
using RestSharp;

namespace DatBoiPente.Logic.Components
{
    public class Board : ICloneable
    {
        public static int BoardWidth = 19;
        public static int BoardHeight = 19;

        private int _friendlyAiPlayerIndex;
        private int _freeCells;

        private BoardCell[][] _cells = new BoardCell[Board.BoardHeight][];
        private List<BoardCell> _cellList;
        private List<BoardCell> _playerCells;

        public int FriendlyAiPlayerIndex
        {
            get { return this._friendlyAiPlayerIndex; }
            set { this._friendlyAiPlayerIndex = value; }
        }

        public int FreeCells
        {
            get { return this._freeCells; }
            set { this._freeCells = value; }
        }

        public BoardCell[][] Cells
        {
            get { return this._cells; }
            set { this._cells = value; }
        }

        public List<BoardCell> CellList
        {
            get { return this._cellList; }
            set { this._cellList = value; }
        }

        public List<BoardCell> PlayerCells
        {
            get { return this._playerCells; }
            set { this._playerCells = value; }
        }

        public Board(int playerIndex)
        {
            this._friendlyAiPlayerIndex = playerIndex;
            for (int i = 0; i < Board.BoardHeight; i++)
            {
                this._cells[i] = new BoardCell[Board.BoardWidth];
                for (int j = 0; j < Board.BoardWidth; j++)
                    this._cells[i][j] = new BoardCell(i, j, BoardCell.CellState.Free);
            }
        }

        public object Clone()
        {
            return new Board(this._friendlyAiPlayerIndex) { Cells = this._cells, FreeCells = this._freeCells, CellList = this._cellList, PlayerCells = this._playerCells };
        }

        public void UpdateBoard(JsonArray boardInfo)
        {
            this._cellList = new List<BoardCell>();
            this._playerCells = new List<BoardCell>();
            this._freeCells = 0;

            for (int i = 0; i < Board.BoardHeight; i++)
            {
                JsonArray row = (JsonArray) boardInfo[i];
                for (int j = 0; j < Board.BoardWidth; j++)
                {
                    int data = (int) (long) row[j];
                    if (data == 0)
                    {
                        this._freeCells++;
                        this._cells[i][j].State = BoardCell.CellState.Free;
                    }
                    else
                        this._cells[i][j].State = data == _friendlyAiPlayerIndex ? BoardCell.CellState.FriendlyAi : BoardCell.CellState.EnemyAi;

                    if (this._cells[i][j].State != BoardCell.CellState.Free)
                        _playerCells.Add(this._cells[i][j]);
                    _cellList.Add(this._cells[i][j]);
                }
            }
        }

        public Dictionary<int, int> GetNeighbouringCells()
        {
            Dictionary<int, int> neighbours = new Dictionary<int, int>();

            return neighbours;

            //        BoardModule.prototype.GetNeighbouringPieces = function(x, y) {
            //            var neighbouringPieces = [];
            //            for (var i = -1; i <= 1; i++)
            //            {
            //                var row = [];
            //                var xCoord = eval(x + i);

            //                for (var j = -1; j <= 1; j++)
            //                {
            //                    row[j] =  {
            //                        value: this.board[xCoord] !== undefined ? this.board[xCoord][eval(y + j)] : undefined,
            //coordinates:
            //                        {
            //                            x: x + i,
            //	y: y + j

            //            }
            //                    }
            //                }

            //                neighbouringPieces[i] = row;
            //            }

            //            return neighbouringPieces;
            //        }
        }
    }
}
