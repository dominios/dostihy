{ /* React components orchestra draft */ }

<Game>

  <GameStatus
    currentRound={27}
    activePlayer={3}
    dice={5}
  />

  <Bank />

  <Trading />

  <GameMap>

    { /* those needs to be separate to allow animations using CSS transitions */ }
    <PlayerIndicator id={1} />
    <PlayerIndicator id={2} />
    <PlayerIndicator id={3} />
    <PlayerIndicator id={4} />

    <Fields>

      <Field id={1} name={"START"} playersOnThisFiled={[4]}/>

        { /* ... */ }

      <Field id={40} name={"NAPOLI"} owner={1} playersOnThisFiled={[1, 2]}>
        <RacingPoint />
        <RacingPoint />
        <RacingPoint />
        <BetByPlayer amount={4000} player={3} />
      </Field>

    </Fields>

  </GameMap/>

  <CurrentPlayer>
    <Account amount={28740} />
    <PlayerInventory>
      <Horse id={"NAPOLI"} />
    </PlayerInventory>
  </CurrentPlayer>

  <OtherPlayersSummary>
    <PlayerSummary name={"Player 2"} />
    <PlayerSummary name={"Player 3"} />
    <PlayerSummary name={"Player 4"} />
  </OtherPlayersSummary>

</Game>


{ /*
We need following reducers:
  1. Bank Reducer: insert / withdraw
  2. Dice Reducer: history of the draw, generates new draws
  3. Player Reducer (by ID): handles player inventory
  4. Game State Reducer: handles who is on the round etc.
  5. Finance Cards Reducer
  6. Luck Cards Reducer
  7. Trade Reducer ???
*/ }
