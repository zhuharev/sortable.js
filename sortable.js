// from http://jsfiddle.net/RubaXa/zLq5J/6/ 
function sortable(rootEl, onUpdate){
    var dragEl, nextEl;
    
    // Делаем всех детей перетаскиваемыми
    [].slice.call(rootEl.children).forEach(function (itemEl){
        itemEl.draggable = true;
    });
    
    // Фнукция отвечающая за сортировку
    function _onDragOver(evt){
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
       
        var target = evt.target;
        if( target && target !== dragEl && target.nodeName == 'LI' ){
            // Сортируем
            var rect = target.getBoundingClientRect();
            var next = (evt.clientY - rect.top)/(rect.bottom - rect.top) > .5;
            rootEl.insertBefore(dragEl, next && target.nextSibling || target);
        }
    }
    
    // Окончание сортировки
    function _onDragEnd(evt){
        evt.preventDefault();
       
        dragEl.classList.remove('ghost');
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);

        if( nextEl !== dragEl.nextSibling ){
            // Сообщаем об окончании сортировки
            onUpdate(dragEl);
        }
    }
    
    // Начало сортировки
    rootEl.addEventListener('dragstart', function (evt){
        dragEl = evt.target; // Запоминаем элемент который будет перемещать
        nextEl = dragEl.nextSibling;
        
        // Ограничиваем тип перетаскивания
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);

        // Пописываемся на события при dnd
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);

        setTimeout(function (){
            // Если выполнить данное действие без setTimeout, то
            // перетаскиваемый объект, будет иметь этот класс.
            dragEl.classList.add('ghost');
        }, 0)
    }, false);
}
