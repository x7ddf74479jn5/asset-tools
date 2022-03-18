import React from "react";

export const BudouX = (source: string[]) => {
  return <span style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>{source.join("<wbr />")}</span>;
};

/**
 * @example
 *
 * yarn budoux -p // 配列形式で出力
 *
 * const source = ["本日は","晴天です。","明日は","曇りでしょう。"];
 *
 * <BudouX  source={source} />
 */
