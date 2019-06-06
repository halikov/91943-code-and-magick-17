'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getWinner = function (winner) {
  var minElement = winner[0];

  for (var i = 1; i < winner.length; i++) {
    if (winner[i] < minElement) {
      minElement = winner[i];
    }
  }

  return minElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  var maxTime = getMaxElement(times);
  var minTime = getWinner(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    if (players[i].indexOf('Вы') !== -1) {
      if (times[i] === minTime) {
        ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + (GAP + FONT_GAP) * 1);
        ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + (GAP + FONT_GAP) * 2);
      } else {
        ctx.fillText('Увы вы проиграли!', CLOUD_X + GAP * 2, CLOUD_Y + (GAP + FONT_GAP) * 1);
        ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + (GAP + FONT_GAP) * 2);
      }
    }
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + (GAP + FONT_GAP) * 3 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
    if (players[i].indexOf('Вы') !== -1) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + (GAP + FONT_GAP) * 3 + BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    } else {
      for (var playerRectColor = 1; playerRectColor <= 3; playerRectColor++) {
        var saturation = 20 * playerRectColor;
        console.log(saturation);
        ctx.fillStyle = 'hsl(240,' + (100 - Math.floor(Math.random() * saturation)) + '%' + ', 50%)';
      }
      ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + (GAP + FONT_GAP) * 3 + BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    }
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP * 2 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + (GAP + FONT_GAP) * 3 + BAR_HEIGHT + GAP * 2);
  }
};
