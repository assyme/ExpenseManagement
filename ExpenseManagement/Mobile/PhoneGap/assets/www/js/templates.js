this["ZS"] = this["ZS"] || {};
this["ZS"]["Templates"] = this["ZS"]["Templates"] || {};

this["ZS"]["Templates"]["EmptyExpenseListTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"text-center\"><span class=\"label label-info\">No expenses added yet. Start adding new expenses!</span></div>";
  });

this["ZS"]["Templates"]["ExpenseListTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    \r\n<div class=\"well well-small\" data=\"";
  if (stack1 = helpers.Id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"div_expense_";
  if (stack1 = helpers.Id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n	<div class=\"page-header\">\r\n		<h3>$";
  if (stack1 = helpers.Amount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Amount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " on <small>";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.Category) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Category; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\r\n			";
  stack1 = helpers['if'].call(depth0, depth0.AddedOnDevice, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</h3>\r\n	</div>\r\n	<button type=\"submit\" class=\"btn btn-success\" id=\"btnSync\">Edit</button>\r\n	<button type=\"submit\" class=\"btn btn-danger\" id=\"btnDelete\">Delete</button>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\r\n				<span class=\"badge badge-success\">New</span>\r\n			";
  }

  stack2 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  });

this["ZS"]["Templates"]["authTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"form-signin\" action=\"#\">\r\n	<h2 class=\"form-signin-heading\">Please sign in</h2>\r\n	<input id='txtUsername' class=\"input-block-level\" type=\"text\" placeholder=\"user name\" />\r\n	<input id='txtPassword' type='password' class=\"input-block-level\" placeholder=\"password\" />\r\n	<label class=\"checkbox\">\r\n		<input type=\"checkbox\" value=\"remember\" id=\"cbRemember\" />\r\n		Remember Me\r\n	</label>\r\n	<button class=\"btn btn-large btn-primary\" id=\"btnLogin\" type=\"button\">Sign in</button>\r\n</form>";
  });

this["ZS"]["Templates"]["footerTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\r\n	<p>Connection type : ";
  if (stack1 = helpers.Connection) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Connection; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n<div>";
  return buffer;
  });

this["ZS"]["Templates"]["newExpenseTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<fieldset class=\"text-center\">\r\n	<legend>Add a new expense</legend>\r\n	<label>Spent on:</label>\r\n	<input type=\"text\" placeholder=\"Where did the money go?\" id=\"txtName\">\r\n	<label>Amount :</label>\r\n	<input type=\"number\" placeholder=\"how much\" id=\"txtAmount\">\r\n	<label>Category :</label>\r\n	<input type=\"text\" placeholder=\"Category..\" id=\"txtCategory\">\r\n	<p>\r\n		<button type=\"submit\" class=\"btn btn-success\" id=\"btnSave\">Save</button>\r\n	<p>\r\n</fieldset>";
  });

this["ZS"]["Templates"]["optionsTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n			<option value=\"0\">Local Storage</option>\r\n			<option value=\"1\">File Storage</option>\r\n			<option value=\"2\">Sql Storage</option>\r\n		";
  }

  buffer += "<fieldset>\r\n	<legend>Options</legend>\r\n	<label>Choose Storage Location:</label>\r\n	<select id=\"sltLocalStore\">\r\n		";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.select || depth0.select),stack1 ? stack1.call(depth0, depth0.StorageLocation, options) : helperMissing.call(depth0, "select", depth0.StorageLocation, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n		<label>Test Storage</label>\r\n		<input type=\"number\" id=\"txtSize\" placeholder=\"data in mb\" />\r\n		<button type=\"button\" class=\"btn btn-info\" id=\"btnTestStorage\">Test</button>\r\n	</select>\r\n\r\n	<p>\r\n		<button type=\"submit\" class=\"btn btn-success\" id=\"btnSaveOptions\">Save</button>\r\n	<p>\r\n</fieldset>\r\n";
  return buffer;
  });