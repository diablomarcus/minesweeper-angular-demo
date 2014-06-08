'use strict';

var minesweeperControllers = angular.module('minesweeperControllers', []);

minesweeperControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	function newCell() {
		var newCell = {'selected': false, 'bomb': false};
		if (Math.random() < 0.2){
			newCell.bomb = true;
		}
		return newCell;
	}

	function createCells() {
		var gridSize = 15;
		$scope.rows = [];
		$scope.numberOfFlags = 0;
		for (var i = 0; i < gridSize; i++) {
			$scope.rows.add({'cells': []});
			for (var j = 0; j < gridSize; j++) {
				var cell = newCell();
				cell.rowNumber = i;
				cell.columnNumber = j;
				if (cell.bomb) {
					$scope.numberOfFlags++;
				}
				
				$scope.rows[i].cells.add(cell);
			}
		}
	}

	function getNumberOfUnclearedCells() {
		var unclearedCells = 0;
		$scope.rows.forEach(function (row) {
			row.cells.forEach(function (cell) {
				if (!cell.selected) {
					unclearedCells++;
				}
			});
		});
		return unclearedCells;
	}
	
	function calculateBombsNearby(cell) {
		var bombs = 0;
		var isLeft = cell.columnNumber == 0;
		var isRight = cell.columnNumber == $scope.rows[0].cells.length - 1;
		var isBottom = cell.rowNumber == $scope.rows.length - 1;
		var isTop = cell.rowNumber == 0;
		if (!isTop) {
			if ($scope.rows[cell.rowNumber - 1].cells[cell.columnNumber].bomb) {
				bombs++;
			}
			if (!isLeft) {
				if ($scope.rows[cell.rowNumber - 1].cells[cell.columnNumber - 1].bomb) {
					bombs++;
				}
			}
			if (!isRight) {
				if ($scope.rows[cell.rowNumber - 1].cells[cell.columnNumber + 1].bomb) {
					bombs++;
				}
			}
		}
		if (!isBottom) {
			if ($scope.rows[cell.rowNumber + 1].cells[cell.columnNumber].bomb) {
				bombs++;
			}
			if (!isLeft) {
				if ($scope.rows[cell.rowNumber + 1].cells[cell.columnNumber - 1].bomb) {
					bombs++;
				}
			}
			if (!isRight) {
				if ($scope.rows[cell.rowNumber + 1].cells[cell.columnNumber + 1].bomb) {
					bombs++;
				}
			}
		}

		if (!isLeft) {
			if ($scope.rows[cell.rowNumber].cells[cell.columnNumber - 1].bomb) {
				bombs++;
			}
		}
		if (!isRight) {
			if ($scope.rows[cell.rowNumber].cells[cell.columnNumber + 1].bomb) {
				bombs++;
			}
		}
		return bombs;
	}

	function checkForLoss(cell) {
		if (cell.bomb) {
			$scope.hasLost = true;
			alert("You lose");
		}
	}
	
	function checkForWin(rows) {
		var hasWon = true;
		rows.forEach(function (row) {
			row.cells.forEach(function (cell) {
				if (!cell.selected && !cell.bomb) {
					hasWon = false;
				}
			});
		});
		if (hasWon) {
			$scope.hasWon = true;
			alert('You win!');
		}
	}

	function resetGame() {
		$scope.hasWon = false;
		$scope.hasLost = false;
		createCells();
	}

	function selectCell(cell) {
		if ($scope.hasWon || $scope.hasLost) {
			return;
		}
		cell.selected = true;
		cell.bombsNearby = calculateBombsNearby(cell);
		checkForLoss(cell);
		checkForWin($scope.rows);
	}

	$scope.selectCell = selectCell;
	$scope.resetGame = resetGame;
	$scope.getNumberOfUnclearedCells = getNumberOfUnclearedCells;
	resetGame();
  }
]);
