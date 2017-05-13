$( document ).ready(function() {



    $('#submitButton').click(function() {
         $.post('', $('#chatForm').serialize())
         loadChat()
    })

    loadChat()


});



function loadChat() {
     $.ajax({
      url: 'conversation',
      success: function(data) {
        $('#chatBody').html(data)
      }

    });


}