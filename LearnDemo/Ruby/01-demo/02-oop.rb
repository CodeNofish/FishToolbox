# 全局变量 全局变量总是以美元符号（$）开始。
$store_name = "Luckin Coffee"


class Customer

  # 类变量 类变量在变量名之前放置符号（@@）
  @@no_of_customers = 0

  # 常量以大写字母开头。
  COPY_RIGHT = "All Reserved"

  # initialize 方法是一种特殊类型的方法，将在调用带参数的类的 new 方法时执行
  def initialize(id, name, addr)
    # 实例变量 实例变量在变量名之前放置符号（@）
    @cust_id = id
    @cust_name = name
    @cust_addr = addr
    @@no_of_customers += 1
  end

  def hello
    # 局部变量 局部变量以小写字母或下划线 _ 开头
    str = "#{$store_name} hello #{@cust_name} #{COPY_RIGHT}"
    puts str
  end

  def get_customers_cnt
    @@no_of_customers
  end

end

cust1 = Customer.new 1, "fish", "china"

cust1.hello

puts cust1.get_customers_cnt

=begin
它们是特殊的变量，有着局部变量的外观，但行为却像常量。您不能给这些变量赋任何值。
self: 当前方法的接收器对象。
true: 代表 true 的值。
false: 代表 false 的值。
nil: 代表 undefined 的值。
__FILE__: 当前源文件的名称。
__LINE__: 当前行在源文件中的编号。
=end
