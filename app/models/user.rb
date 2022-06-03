class User < ApplicationRecord
  has_many :portfolios, dependent: :destroy
  
  has_secure_password

  enum role: [:client, :advisor, :admin]
  
  validates :username, presence: true, uniqueness: true, length: {minimum: 4}
  validates :password, length: {minimum: 5}
end
