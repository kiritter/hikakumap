(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MapDragHandler = class MapDragHandler {
        constructor(global) {
            this.dragHandlerCore = new MyApp.DragHandlerCore(global);
        }

        init() {
            var dragHandleSelector = MapDragHandler.getDragHandleSelector();
            var movingTargetSelector = MapDragHandler.getMovingTargetSelector();

            this.dragHandlerCore.init(
                dragHandleSelector,
                movingTargetSelector,
                MapDragHandler._mousedownBeforeCallback,
                MapDragHandler._mouseupBeforeCallback,
                MapDragHandler._mousemoveCallback
            );
        }

        static getDragHandleSelector() {
            return '.js-drag-handle-buffer';
        }
        static getMovingTargetSelector() {
            return '.js-map-left-wrap';
        }

        static _mousedownBeforeCallback(event, bodyEl, dragHandleEl) {
            bodyEl.classList.add('cursor-col-resize-whole');
        }

        static _mouseupBeforeCallback(event, bodyEl, dragHandleEl) {
            bodyEl.classList.remove('cursor-col-resize-whole');
        }

        static _mousemoveCallback(event, coreObj, dragHandleEl, movingTargetEl) {

            var buffer = 100;
            var bodyWidth = document.body.clientWidth;
            if ((event.pageX <= buffer ) || (bodyWidth - buffer <= event.pageX)) {
                return;
            }

            var diff = event.pageX - coreObj.prevPageX;
            coreObj.prevPageX = event.pageX;
    
            var currentLeft = dragHandleEl.getBoundingClientRect().left;
            var currentWidth = movingTargetEl.getBoundingClientRect().width;
    
            dragHandleEl.style.left = (currentLeft + diff) + 'px';
            movingTargetEl.style.width = (currentWidth + diff) + 'px';
        }

    };

}(this));
