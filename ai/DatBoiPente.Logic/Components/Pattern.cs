using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatBoiPente.Logic.Components
{
    public class Pattern
    {
        private Board.BoardCellState[] _cells;

        public Board.BoardCellState[] Cells => _cells;

        public Pattern(Board.BoardCellState[] cells)
        {
            this._cells = cells;
        }

        public bool Match(Pattern pattern, bool mirror = false)
        {
            if (pattern.Cells.Length != this._cells.Length) { return false; }
            for (int i = 0; i < this._cells.Length; i++)
                if (this._cells[i] != pattern.Cells[i]) return false;

            return true;
        }
    }
}