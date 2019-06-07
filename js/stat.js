'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var cloudPadding = GAP * 2;
var FONT_GAP = 20;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_X = CLOUD_X + BAR_GAP;
var BAR_Y = CLOUD_HEIGHT - (cloudPadding + GAP); // задает вехнюю точку столбца подсчетом от земли

var playersNameMarginTop = CLOUD_HEIGHT - cloudPadding - GAP; // расположение по вертикали имени от земли
var FONT = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var renderGreetingText = function (ctx, color, font, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var renderStatisticsBar = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');
  ctx.textBaseline = 'hanging';
  renderGreetingText(ctx, '#000', FONT, 'Ура вы победили!', CLOUD_X + cloudPadding, CLOUD_Y + cloudPadding);
  ctx.textBaseline = 'hanging';
  renderGreetingText(ctx, '#000', FONT, 'Список результатов:', CLOUD_X + cloudPadding, CLOUD_Y + cloudPadding + FONT_GAP);

  var maxTime = getMaxElement(times);

  players.forEach(function (name, index) {
    var barWidth = BAR_WIDTH;
    var barHeight = (BAR_HEIGHT * times[index]) / maxTime;
    var barPositionY = BAR_Y - barHeight;
    var barPositionX = BAR_X + (BAR_WIDTH + BAR_GAP) * index;

    if (name === ('Вы')) {
      renderStatisticsBar(ctx, 'hsl(0, 100%, 50%)', barPositionX, barPositionY, barWidth, barHeight);
    } else {
      renderStatisticsBar(ctx, 'hsl(240,' + Math.ceil(Math.random() * 100) + '%' + ', 50%)', barPositionX, barPositionY, barWidth, barHeight);
    }

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.round(times[index]), barPositionX, barPositionY - FONT_GAP);
    ctx.fillText(name, BAR_X + (BAR_GAP + BAR_WIDTH) * index, playersNameMarginTop + GAP);
  });
};
