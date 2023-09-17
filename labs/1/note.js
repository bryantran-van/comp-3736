function Note() {
    this.text = ''; // Initialize the text property with an empty string
    
    // Create a function to set the text content of the note
    this.setText = function (text) {
      this.text = text;
    };
    
    // Create a function to get the text content of the note
    this.getText = function () {
      return this.text;
    };
  }