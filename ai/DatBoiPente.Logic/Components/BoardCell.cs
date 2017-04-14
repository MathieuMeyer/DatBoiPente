namespace DatBoiPente.Logic.Components
{
    public class BoardCell
    {
        public enum CellState { Free, FriendlyAi, EnemyAi }

        private int _x;
        private int _y;
        private CellState _state;

        public int X => _x;
        public int Y => _y;

        public CellState State
        {
            get { return _state; }
            set { _state = value; }
        }

        public BoardCell(int x, int y, CellState state)
        {
            this._x = x;
            this._y = y;
            this._state = state;
        }
    }
}
