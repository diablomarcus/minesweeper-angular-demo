'use strict';

var minesweeperControllers = angular.module('minesweeperControllers', []);

minesweeperControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	function newCell() {
		var newCell = {'state': false, 'bomb': false};
		if (Math.random() < 0.05){
			newCell.bomb = true;
		}
		return newCell;
	}

	function createCells() {
		$scope.rows = [];
		$scope.numberOfFlags = 0;
		for (var i = 0; i < 10; i++) {
			$scope.rows.add({'cells': []});
			for (var j = 0; j < 10; j++) {
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

		//Sides
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

	function selectCell(cell) {
		cell.state = !cell.state;
		cell.bombsNearby = calculateBombsNearby(cell);
	}
	
	$scope.selectCell = selectCell;
	createCells();
  }
]);
