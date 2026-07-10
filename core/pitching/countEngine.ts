import { PitchCall } from "@/types/chart";

type CountState = {
  balls: number;
  strikes: number;
};

export function parseCount(count: string): CountState {
  const [ballsText = "0", strikesText = "0"] = count.split("-");

  return {
    balls: Number(ballsText) || 0,
    strikes: Number(strikesText) || 0,
  };
}

export function formatCount({ balls, strikes }: CountState) {
  return `${balls}-${strikes}`;
}

export function calculateNextCount(
  currentCount: string,
  call: PitchCall
): {
  count: string;
  plateAppearanceEnded: boolean;
  automaticResult?: "BB" | "K" | "HBP";
} {
  const current = parseCount(currentCount);

  if (call === "Ball") {
    const balls = current.balls + 1;

    if (balls >= 4) {
      return {
        count: "4-0",
        plateAppearanceEnded: true,
        automaticResult: "BB",
      };
    }

    return {
      count: formatCount({
        balls,
        strikes: current.strikes,
      }),
      plateAppearanceEnded: false,
    };
  }

  if (call === "Called Strike" || call === "Swinging Strike") {
    const strikes = current.strikes + 1;

    if (strikes >= 3) {
      return {
        count: `${current.balls}-3`,
        plateAppearanceEnded: true,
        automaticResult: "K",
      };
    }

    return {
      count: formatCount({
        balls: current.balls,
        strikes,
      }),
      plateAppearanceEnded: false,
    };
  }

  if (call === "Foul") {
    return {
      count: formatCount({
        balls: current.balls,
        strikes:
          current.strikes < 2
            ? current.strikes + 1
            : current.strikes,
      }),
      plateAppearanceEnded: false,
    };
  }

  if (call === "HBP") {
    return {
      count: currentCount,
      plateAppearanceEnded: true,
      automaticResult: "HBP",
    };
  }

  if (call === "In Play") {
    return {
      count: currentCount,
      plateAppearanceEnded: true,
    };
  }

  return {
    count: currentCount,
    plateAppearanceEnded: false,
  };
}