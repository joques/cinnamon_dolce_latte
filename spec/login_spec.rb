#***************************************************************
# This file defines the specs for the login page
#
# @author joques
#****************************************************************

begin
  kind_of? ::Lebowski::Foundation
rescue Exception => e
  include Lebowski::Foundation
  include Lebowski::Foundation::Views
end

App = MainApplication.new \
  :app_root_path => "/cinnamon_dolce_latte",
  :app_name => "CinnamonDolceLatte"
  
App.start do |app|
  app['loginPage.loginPane.isPaneAttached'] == true
end

App.move_to 1, 1 
App.resize_to 1024, 768 

App.define_path 'box', 'loginPage.loginPane.boxView'

describe "login test" do
  
  before(:all) do
    @user_name_text_field = App['box.userName.field', TextFieldView]
    @pwd_text_field = App['box.passWord.field', TextFieldView]
    @login_button = App['box.loginButton', ButtonView]
  end
  
  it "will check that login button has title 'Log In'" do
    @login_button.should have_title /Log In/i
  end
  
  it "will confirm textfield initial setting" do
    @user_name_text_field.should have_hint /user name/i
    @user_name_text_field.should have_value that_is_empty
       
    @pwd_text_field.should be_password
    @pwd_text_field.should have_hint /password/i
    @pwd_text_field.should have_value that_is_empty
  end
  
  it "will enter an empty password and click the log in button and see an error AlertPane" do
    App.responding_panes.should_not have_any AlertPane
    
    @user_name_text_field.type "unval"
    @pwd_text_field.type ""
    @login_button.click 
    
    @pwd_text_field.should have_value that_is_empty
    
    App.responding_panes.should have_one AlertPane
    
    pane = App.key_pane AlertPane
    pane.should be_error
    pane.should have_button_count 1
    pane.should have_button 'ok'
    pane.click_button 'ok'
        
    App.responding_panes.should_not have_any AlertPane
  end  
  
  it "will enter an empty user name and click the log in button and see an error AlertPane" do
     App.responding_panes.should_not have_any AlertPane
     
     @user_name_text_field.type ""
     @pwd_text_field.type "pwdval1"
     @login_button.click  
     
     @user_name_text_field.should have_value that_is_empty  
     
     App.responding_panes.should have_one AlertPane
     
     pane = App.key_pane AlertPane
     pane.should be_error
     pane.should have_button_count 1
     pane.should have_button 'ok' 
     pane.click_button 'ok'
     
     App.responding_panes.should_not have_any AlertPane
   end
   
   it "will enter a correct user name and password and click the log in button and see no AlertPane" do
     App.responding_panes.should_not have_any AlertPane

     @user_name_text_field.type "cinnamon"
     @pwd_text_field.type "cinnamon"
     @login_button.click

     App.responding_panes.should_not have_any AlertPane
   end   
  
  it "will enter a wrong user name and a wrong password and click the log in button and see an error AlertPane" do
    App.responding_panes.should_not have_any AlertPane
    
    @user_name_text_field.type "unval2"
    @pwd_text_field.type "pwdval2"
    @login_button.click    
    
    App.responding_panes.should have_one AlertPane
    
    pane = App.key_pane AlertPane
    pane.should be_error
    pane.should have_button_count 1
    pane.should have_button 'ok'      
    pane.click_button 'ok'
        
    App.responding_panes.should_not have_any AlertPane
  end
  
end