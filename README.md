# 北大6講座エアロゾルシミュレーション

## 概要

このプロジェクトは、北大の紫外線エアロゾルシミュレーションの研究用ツールです。  
TypeScriptで開発されており、CFDシミュレーション結果のCSVファイルを処理します。
文責：かど(26卒)

## 前提条件

- **CSVファイルの準備**: まだCSVファイルを生成していない場合は、先に`hokudai-pimplefoam-cfd`を用いてCFDシミュレーションを実行してください
- **必要なソフトウェア**: Node.jsとpnpmがインストールされている必要があります。

## 環境構築

### 1. 必要なソフトウェアのインストール

以下のバージョンで動作確認済みです：

- **Node.js**: v22.18.0
- **pnpm**: 8.15.9

### 2. リポジトリのクローン

```bash
git clone https://github.com/Bakado0704/hokudai-aerosol-simulator.git
cd hokudai-aerosol-simulator
```

## 実行手順

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. プロジェクトのビルド

```bash
pnpm run build
```

### 3. CSVファイルの配置

`dist/positions/`ディレクトリに以下のCSVファイルを配置してください：

- `positions_1.csv`
- `positions_2.csv`
- ...
- `positions_100.csv`

### 4. 計算を実行

```bash
node calculation
```

これで、計算が実行されるはずです
