# We need this as a fix to by pass Rails using session cookies by default as a bug.

module RackSessionFix
    extend ActiveSupport::Concern
    class FakeRackSession < Hash
      def enabled?
        false
      end
    end
    included do
      before_action :set_fake_rack_session_for_devise
      private
      def set_fake_rack_session_for_devise
        request.env['rack.session'] ||= FakeRackSession.new
      end
    end
  end

