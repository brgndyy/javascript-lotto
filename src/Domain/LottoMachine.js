import Lotto from "./Lotto";

export default class LottoMachine {
  #money;

  #lottos;

  constructor(money) {
    this.#money = money;
    this.#validMoney();
    this.#makeLottoByMoney();
  }

  #validMoney() {
    if (this.#money < 1000) {
      throw new Error("❌");
    }
  }

  #makeLottoByMoney() {
    const CNT = Math.floor(this.#money / 1000);
    this.#lottos = Array.from({ length: CNT }, () => {
      const numbers = this.#makeRandomNumbers();
      return new Lotto(numbers);
    });
  }

  #makeRandomNumbers() {
    const lottoSet = new Set();

    while (lottoSet.size !== 6) {
      lottoSet.add(Math.ceil(Math.random() * 45));
    }

    return [...lottoSet];
  }

  getLottos() {
    return [...this.#lottos];
  }

  getWinLottos(winNumbersObj) {
    const returnValue = [null, ...Array.from({ length: 5 }, () => 0)];

    this.#lottos.forEach((lotto) => {
      lotto.calculateRank(winNumbersObj);
      const rank = lotto.getRank();
      if (rank) returnValue[rank] += 1;
    });
    return returnValue;
  }
}
