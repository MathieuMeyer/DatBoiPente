namespace DatBoiPente.Logic.Components
{
    public class Pattern
    {
        private BoardCell[] _cells;

        public BoardCell[] Cells => _cells;

        public Pattern(BoardCell[] cells)
        {
            this._cells = cells;
        }

        public bool Match(Pattern pattern, bool mirror = false)
        {
            if (pattern.Cells.Length != this._cells.Length) { return false; }
            for (int i = 0; i < this._cells.Length; i++)
                if (this._cells[i].State != pattern.Cells[i].State) return false;

            return true;
        }
    }
}