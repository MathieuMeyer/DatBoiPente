using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatBoiPente.Logic.Components;

namespace DatBoiPente.Logic
{
    public class DecisionManager
    {
        public async Task<GameState.LastPlayed> TakeDecision()
        {
            return new GameState.LastPlayed(0, 0);
        }
    }
}
