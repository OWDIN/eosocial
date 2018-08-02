#include "eosocial.hpp"

// @abi action debug
void eosocial::debug() {
    print("1807302023 - This contract is under the development.");
}

// @abi action write
void eosocial::write(const account_name author, const string content) {
    post_table post(_self, _self); // code, scope
    require_auth(author);

    post_id post_index;
    get_post_id(post_index);
    uint64_t post_id = post_index.id++;

    post.emplace(_self, [&](auto& data) {
        data.id = post_id;
        data.content = content;
        data.author = author;
        data.created_at = now();
    });

    set_post_id(post_index);
}

// @abi action update
void eosocial::update(const uint64_t post_id, const account_name author, const string content) {
    post_table post(_self, _self);
    require_auth(author);

    auto post_iter = post.find(post_id);
    eosio_assert(post_iter != post.end(), "Post doesn't exist");

    post.modify(post_iter, 0, [&](auto& data) {
        data.content = content;
        data.updated_at = now();
    });
}

// @abi action remove
void eosocial::remove(const uint64_t post_id) {
    post_table post(_self, _self);

    auto post_iter = post.find(post_id);

    if (post_iter == post.end()) {
        print("Post does not exist.");
    }

    if (post_iter->id == post_id) {
        require_auth(post_iter->author);
        post.erase(post_iter);
        print("Post deleted.");
    }
}

// @abi action vote
void eosocial::vote(const uint64_t post_id, const account_name voter, const string type) {
    poll_table poll(_self, post_id);

    auto poll_iter = poll.begin();
    while (poll_iter != poll.end() && poll_iter->post_id != post_id) {
        poll_iter++;
    }

    if (poll_iter == poll.end()) {
        vote_id vote_index;
        get_vote_id(vote_index);
        uint64_t vote_id = vote_index.id++;

        poll.emplace(_self, [&](auto& data) {
            data.id = vote_id;
            data.post_id = post_id;
            data.voter = voter;
            data.type = type;
            data.voted_at = now();
        });
        print("Voted: ", post_id);

        set_vote_id(vote_index);
    } else if (poll_iter->voter == voter) {
        require_auth(poll_iter->voter);

        if (poll_iter->type == type) {
            poll.erase(poll_iter);
            print("Vote deleted: ", post_id);
        } else {
            poll.modify(poll_iter, 0, [&](auto& data) {
                data.type = type;
                data.voted_at = now();
            });
        }
    }
}

void eosocial::removevote(const uint64_t id) {
    poll_table poll(_self, _self);

    auto poll_iter = poll.find(id);
    eosio_assert(poll_iter != poll.end(), "Poll doesn't exist");

    if (poll_iter->id == id) {
        // require_auth(N(eosio.code));
        require_auth(_self);
        poll.erase(poll_iter);
        print("Vote deleted.");
    }
}
