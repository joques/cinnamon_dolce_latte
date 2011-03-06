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
  
end