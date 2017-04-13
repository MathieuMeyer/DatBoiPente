namespace DatBoiPente.Logic.Components
{
    public class GameState
    {
        public struct LastPlayed
        {
            public LastPlayed(int x, int y)
            {
                this.X = x;
                this.Y = y;
            }

            public int X { get; set; }
            public int Y { get; set; }
        }

        public bool IsPlaying { get; set; } = false;
        public bool IsOurTrun { get; set; }
        public Board Board { get; set; }
        public int PlayerOneScore { get; set; }
        public int PlayerTwoScore { get; set; }
        public LastPlayed LastPlayedCoordinates { get; set; }
        public bool IsGameOver { get; set; }
        public string GameOverMessage { get; set; }
        public int Turn { get; set; }
    }
}
